#!/bin/bash
echo 'Nodemon: running custom script on restart'
# building apidoc when code changes
apidoc -i ./routes -o ../apidoc/