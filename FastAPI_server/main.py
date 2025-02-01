from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import onnxruntime as ort
import numpy as np
from PIL import Image
import io
import uvicorn
import torch
import torch.nn.functional as F
import torchvision.transforms as transforms
import httpx  # For making HTTP requests to the Node.js backend

app = FastAPI()

# Add CORS middleware to allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Load ONNX model using ONNX Runtime
onnx_model_path = "aditya_cnn60.onnx"
session = ort.InferenceSession(onnx_model_path)

# Define input/output names
input_name = session.get_inputs()[0].name
output_name = session.get_outputs()[0].name

transform = transforms.Compose([
    transforms.Grayscale(),  # Convert image to grayscale
    transforms.Resize((28, 28)),  # Resize to 28x28
    transforms.ToTensor(),  # Convert image to tensor
    transforms.Normalize((0.5,), (0.5,))  # Normalize (mean=0.5, std=0.5 for grayscale)
])

def preprocess_image(image):
    return transform(image).unsqueeze(0).numpy()  # Add batch dimension and convert to numpy

@app.post("/predict/")
async def predict(file: UploadFile = File(...), location: str = None, description: str = None):
    # Read the image file
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data))

    # Preprocess the image
    image = preprocess_image(image)

    # Debug: Check the input shape and type
    print(f"Input shape: {image.shape}")
    print(f"Input dtype: {image.dtype}")

    # Run the inference
    output = session.run([output_name], {input_name: image})
    output = torch.tensor(output[0])  # Convert to tensor

    # Debug: Print raw output
    print(f"Raw output from the model (Logits): {output}")

    # Apply sigmoid and threshold
    output = torch.sigmoid(output).squeeze()

    print(f"Output from the model (Probability): {output}")

    predicted_label = (output > 0.65).int().item()

    # Debug: Print the final predicted label
    print(f"Predicted label: {predicted_label}")

    result_data = {
        "predicted_label": predicted_label,
        "probability": round(output.item(),4) # Return the probability as well
    }

    return result_data  # Return prediction result to the frontend

if __name__ == "__main__":
    # Custom message when the server is running
    print("Server is running on http://127.0.0.1:8000")
    uvicorn.run(app, host="127.0.0.1", port=8000)

















