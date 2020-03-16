# MongoDB 3.6 Change Streams Node Sample

### SEAL setup 
- `docker-compose up -d`
- `docker-compose exec db1 mongo --eval rs.initiate()`
- `cat config.js`
- `node listen.js`
- `node produce.js`
