#!bin/bash
sudo docker build -t gamevibe-helper .
sudo docker run -d --name gamers-helper gamevibe-helper:latest
