FROM python:3.10

WORKDIR /app

copy . .

run pip install --no-cache-dir -r requirements.txt

expose 5000


CMD [ "python", "app/app.py" ]