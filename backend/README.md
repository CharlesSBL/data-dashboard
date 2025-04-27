# configuration
pip install -r requirements.txt
python app.py


# nix configuration
nix-shell -p python3Packages.virtualenv
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
