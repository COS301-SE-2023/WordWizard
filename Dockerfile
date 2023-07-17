FROM python:3.9

WORKDIR /app

COPY . .

RUN pip install --upgrade pip && \
    pip install -r libs/api/requirements.txt 

EXPOSE 8000

CMD ["uvicorn libs.api.api:app --reload", "--host", "0.0.0.0", "--port", "8000"]
