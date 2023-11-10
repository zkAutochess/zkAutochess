from flask import Flask, request, jsonify
from web3 import Web3
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
games = {}

def is_valid_ethereum_address(address):
    infura_api_key = os.getenv('INFURA_API_KEY')
    if not infura_api_key:
        raise ValueError('INFURA_API_KEY is not set in the .env file')

    w3 = Web3(Web3.WebsocketProvider(f'wss://mainnet.infura.io/ws/v3/{infura_api_key}'))

    if not w3.is_address(address):
        return False

    return True

def create_game(player1, player2):
    # Initialize the game state, e.g., the 8x8 board and player assets
    game_id = len(games) + 1
    games[game_id] = {
        'player1': player1,
        'player2': player2,
        'board': [[None] * 8 for _ in range(8)],  # Placeholder for the 8x8 board
        'assets': {'warrior', 'archer', 'mage'},  # Types of assets
    }
    return game_id

def place_asset(game_id, player, assets):
    # Validate the input format
    if not isinstance(assets, list) or len(assets) != 5:
        return jsonify({'error': 'Invalid input format for assets. It should be a list of 5 assets.'}), 400

    for asset in assets:
        asset_type = asset.get('type')
        row = asset.get('row')
        col = asset.get('col')

        # Validate asset attributes
        if asset_type not in games[game_id]['assets']:
            return jsonify({'error': f'Invalid asset type: {asset_type}'}), 400

        if not (0 <= row < 8) or not (0 <= col < 8):
            return jsonify({'error': 'Invalid row or column value'}), 400

        # Place the asset on the board
        games[game_id]['board'][row][col] = {'player': player, 'type': asset_type}

    return jsonify({'message': 'Assets placed successfully'})


@app.route('/start_game', methods=['POST'])
def start_game():
    data = request.get_json()

    player1 = data.get('player1')
    player2 = data.get('player2')

    if not (is_valid_ethereum_address(player1) and is_valid_ethereum_address(player2)):
        return jsonify({'error': 'Invalid Ethereum addresses'}), 400

    game_id = create_game(player1, player2)

    return jsonify({'message': 'Game created successfully', 'game_id': game_id})

@app.route('/provide_input', methods=['POST'])
def provide_input():
    data = request.get_json()

    game_id = data.get('game_id')
    player = data.get('player')
    assets = data.get('assets')

    if game_id not in games:
        return jsonify({'error': 'Invalid game ID'}), 400

    response = place_asset(game_id, player, assets)
    return response

if __name__ == '__main__':
    app.run(debug=True)