FROM continuumio/miniconda3

WORKDIR /app

COPY environment.yml .
RUN conda env create -f environment.yml

SHELL ["conda", "run", "--no-capture-output", "-n", "diplom", "/bin/bash", "-c"]

COPY entrypoint.sh /app/
RUN chmod +x entrypoint.sh

COPY . /app/
CMD ./entrypoint.sh

#FROM --platform=linux/amd64 python:3.10
#
#WORKDIR /app
#COPY requirements.txt .
#
#RUN pip install --upgrade pip && pip install -r requirements.txt
#
#COPY entrypoint.sh /app/
#RUN chmod +x entrypoint.sh
#
#COPY . /app/
#
#CMD ./entrypoint.sh
