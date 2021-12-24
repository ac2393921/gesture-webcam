FROM python:3.8
# FROM sonoisa/deep-learning-coding:pytorch1.9.0_tensorflow2.6.0

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y libgl1-mesa-glx libglib2.0-0 libsm6 \
    libxrender1 libxext6 v4l-utils libxkbcommon-x11-0

# ENV QT_DEBUG_PLUGINS=1
# ENV DISPLAY=$(hostname):0
ENV DISPLAY=host.docker.internal:0

WORKDIR /app/backend

COPY ../backend/requirements.txt ./

RUN python3 -m pip install --upgrade pip setuptools
RUN pip install -r requirements.txt
RUN pip install tensorflow -f https://tf.kmtea.eu/whl/stable.html

RUN rm -rf /var/lib/apt/lists/*