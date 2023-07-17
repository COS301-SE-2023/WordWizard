FROM python:3.9

WORKDIR /app

COPY . .

RUN pip install --upgrade pip && \
    pip install poetry && \
    poetry config virtualenvs.create false && \
    poetry install --no-dev --no-root

EXPOSE 8000

CMD ["poetry", "run", "uvicorn", "libs.api.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
