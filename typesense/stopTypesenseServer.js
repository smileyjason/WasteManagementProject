const { exec } = require("child_process");
require("dotenv").config();

const NAME = process.env.TYPESENSE_NAME;

const command = `docker rm -f TypesenseWasteManagement`;
/*`docker run -d -p ${PORT}:8108 -v\`pwd\`/typesense-server-data/:/data \
typesense/typesense:0.22.2 --data-dir /data --api-key=${API_KEY} --listen-port ${PORT}  --enable-cors`;*/

/*`docker run -d -p ${PORT}:8108 -v\`pwd\`/typesense-server-data/:/data \
typesense/typesense:0.22.0.rcu6 --data-dir /data --api-key=${API_KEY} --listen-port ${PORT}  --enable-cors`;*/
//`docker run -i -p 8108:8108 -v/tmp/typesense-server-data-1b/:/data typesense/typesense:0.22.2 --data-dir /data --api-key=xyz --listen-port 8108 --enable-cors`;

exec(command, (err, stdout, stderr) => {
  if (!err && !stderr) console.log("Typesense Server is stopping...");

  if (err) {
    console.log("Error stopping server: ", err);
  }

  if (stderr) {
    console.log("Error stopping server: ", stderr);
  }

  if (stdout) {
    console.log("Server output: ", stdout);
  }
});
