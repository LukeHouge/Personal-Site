# Portfolio
My own personal landing page and portfolio to display my work and photography.

## Structure
 - Served on an Ubuntu 18 LTS Server running a LAMP (Linux, Apache, mySQL, Php) stack.
 - Utilizing git for version control, commiting changes to a seperate branch and issuing a pull request to deploy changes.
 - Then leveraging Buddy to listen for commits to the master branch, upload the repository to an internal network facing machine temp folder, and then issue scp commands via ssh to transfer those files internally to the server itself.
