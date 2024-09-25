cd DEM-China-wgs84-Mesh-12.5M
nohup python3 ../start.py 8803 &
cd ..
httpserver -h localhost -p 8071 -v
