import os
from dotenv import load_dotenv
import requests
load_dotenv()

def get_image(prompt="Wizard"):
    access_key = os.getenv("ACCESS_KEY")
    headers = {"Authorization": "Client-ID " + access_key}
    params = {"query": prompt, "page": 1, "per_page": 10}
    response = requests.get("https://api.unsplash.com/search/photos", headers=headers, params=params)
    if response.status_code == 200:
        data = response.json()
        return data['results'][0]['urls']['small']
    else:
        print(f"Request failed: {response.status_code} - {response.reason}")