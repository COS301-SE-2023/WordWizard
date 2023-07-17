FROM python:3.9

WORKDIR /app

COPY . .

RUN pip install --upgrade pip && \
    pip install -r requirements.txt 

EXPOSE 8000

CMD ["poetry", "run", "uvicorn", "libs.api.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
