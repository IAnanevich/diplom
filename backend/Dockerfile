FROM continuumio/miniconda3

WORKDIR /app
COPY environment.yml /app/

RUN conda env create -f environment.yml
SHELL ["conda", "run", "-n", "diplom", "/bin/bash", "-c"]

COPY entrypoint.sh /app/
RUN chmod +x entrypoint.sh

COPY src /app/
CMD ./entrypoint.sh
