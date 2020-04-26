# Start server for exposure of front-end files
nohup node server/server.js 2> logs.txt &

# Keep it running inside the container
while true; do
  sleep 86400;
done
