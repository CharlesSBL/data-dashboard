## configuration
pip install -r requirements.txt
python app.py


## nix configuration
# Install virtualenv via Nix
nix-shell -p python3Packages.virtualenv

# Create a virtual environment
virtualenv venv

# Activate the environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
python app.py
