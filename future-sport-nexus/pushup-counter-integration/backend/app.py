from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
import cv2
import mediapipe as mp
import asyncio

app = FastAPI()

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()
mp_drawing = mp.solutions.drawing_utils

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Push-up Counter API"}

async def generate_pushup_count():
    cap = cv2.VideoCapture(0)
    counter = 0
    stage = None

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(image)
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        try:
            landmarks = results.pose_landmarks.landmark

            shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                        landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
            elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                     landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
            wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                     landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]

            angle = calculate_angle(shoulder, elbow, wrist)

            if angle > 160:
                stage = "up"
            if angle < 70 and stage == "up":
                stage = "down"
                counter += 1

            yield f"data: {counter}\n\n"

        except Exception as e:
            yield f"data: Error processing frame: {str(e)}\n\n"

    cap.release()

@app.get("/start-pushup-count")
async def start_pushup_count():
    return StreamingResponse(generate_pushup_count(), media_type="text/event-stream")

def calculate_angle(a, b, c):
    import numpy as np
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)

    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)

    if angle > 180.0:
        angle = 360 - angle
    return angle