FROM mcr.microsoft.com/playwright:v1.43.0-jammy
RUN apt-get update && apt-get install -y python3-pip ffmpeg python3-venv && \
    python3 -m venv /opt/venv && /opt/venv/bin/pip install yt-dlp
ENV PATH="/opt/venv/bin:$PATH"
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
