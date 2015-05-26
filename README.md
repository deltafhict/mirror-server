mirror-server
=============

The server for the Delta mirror project.



Environment setup
---

__Node__

First, install n(ode) p(ackage) m(anager) if you don't have it already. It comes with node.

You can get it at [https://nodejs.org/](https://nodejs.org/).


Then, install the dependencies using `npm`

    npm install


Running
---


__Server__  
The server can be run with

    node js/server.js

The server is now available at `ws://127.0.0.1:1337` through a websocket.

__Frontend__  
The frontend can be accessed by opening index.html in any webbrowser that supports websockets.  
Note that the server should be running before the frontend is accessed, because  
the frontend tries to connect to the server when it starts.


Testing
---

To be implemented


Deployment
---

N/A. This will only run on localhost.