FROM python:3.9

WORKDIR /app

COPY . .

RUN pip install -r libs/api/requirements.txt 
    # cd libs/api && \
    # python3 -m venv venv && \
    # venv/Scripts/Activate.ps1 && \
    # pip install --upgrade pip && \

EXPOSE 8000

CMD ["uvicorn libs.api.api:app ", "--host", "0.0.0.0", "--port", "8000"]
