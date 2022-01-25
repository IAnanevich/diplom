FROM python:3.9
ENV PYTHONUNBUFFERED 1
WORKDIR /app
COPY Pipfile* /app/

RUN pip install pipenv \
    && pipenv install --deploy --system --ignore-pipfile

COPY entrypoint.sh /app/
RUN chmod +x entrypoint.sh

COPY src /app/

CMD ./entrypoint.sh
