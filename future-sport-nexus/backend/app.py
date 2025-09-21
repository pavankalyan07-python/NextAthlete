from flask import Flask, request, jsonify
import cv2
import mediapipe as mp
import numpy as np
import tempfile
import os

app = Flask(__name__)

def count_pushups(video_path):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print("Failed to open video file:", video_path)
        return 0  # or handle the error as needed

    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose()
    counter = 0
    stage = None

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(image)
        try:
            landmarks = results.pose_landmarks.landmark
            shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                        landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
            elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                     landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
            wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                     landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
            a, b, c = np.array(shoulder), np.array(elbow), np.array(wrist)
            radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
            angle = np.abs(radians*180.0/np.pi)
            if angle > 180.0:
                angle = 360 - angle
            if angle > 160:
                stage = "up"
            if angle < 70 and stage == "up":
                stage = "down"
                counter += 1
        except:
            pass
    cap.release()
    return counter

@app.route('/api/pushup-count', methods=['POST'])
def pushup_count():
    if 'video' not in request.files:
        return jsonify({'error': 'No video uploaded'}), 400
    video = request.files['video']
    with tempfile.NamedTemporaryFile(delete=False, suffix='.webm') as tmp:
        video.save(tmp.name)
        cap = cv2.VideoCapture(tmp.name)
        if not cap.isOpened():
            print("Failed to open video file:", tmp.name)
            os.unlink(tmp.name)
            return jsonify({'error': 'Failed to open video file'}), 400
        count = count_pushups(tmp.name)
        os.unlink(tmp.name)
    return jsonify({'repCount': count})

if __name__ == '__main__':
    app.run(debug=True)