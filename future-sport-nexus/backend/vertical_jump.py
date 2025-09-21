import cv2
import mediapipe as mp

# Initialize Mediapipe pose model
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()
mp_drawing = mp.solutions.drawing_utils

# Start webcam
cap = cv2.VideoCapture(0)

baseline_hip_y = None
max_jump = 0

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Convert frame to RGB
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(rgb_frame)

    if results.pose_landmarks:
        h, w, _ = frame.shape

        # Left hip landmark (you can use RIGHT_HIP too)
        left_hip = results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
        hip_y = int(left_hip.y * h)

        # Draw skeleton
        mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

        # Set baseline hip position (standing height)
        if baseline_hip_y is None:
            baseline_hip_y = hip_y

        # Jump height in pixels
        jump_height_px = baseline_hip_y - hip_y
        if jump_height_px > max_jump:
            max_jump = jump_height_px

        # Show current jump height only
        cv2.putText(frame, f"Jump Height: {jump_height_px}px", (30, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    cv2.imshow("Vertical Jump Height", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
