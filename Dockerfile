FROM python:3.9

WORKDIR /app

COPY . .

RUN pip install --upgrade pip && \
    cd libs/api && \
    python3 -m venv venv && \
    venv/Scripts/Activate.ps1 && \
    pip install -r requirements.txt 

EXPOSE 8000

CMD ["uvicorn libs.api.api:app --reload", "--host", "0.0.0.0", "--port", "8000"]
