# NGINX Proxy Server
Nginx (pronounced "engine-x") is an open source reverse proxy server for HTTP, HTTPS, SMTP, POP3, and IMAP protocols, as well as a load balancer, HTTP cache, and a web server (origin server).
The ACME application uses NGINX as a proxy server for routing requests to the front-end or back-end.

All requests prefixed with `/server` are routed to the back-end web-service. For example, to get the list of devices, call GET: http://localhost:8080/server/device.

All requests prefixed with `/socket.io` are routed to the back-end service for socket communications.

All other requests are routed to the front-end service.
