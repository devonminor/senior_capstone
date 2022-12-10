FROM python:3.10

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN pip3 install waitress

COPY . .

CMD ["waitress-serve", "--port=5000", "--call", "index:create_app"]