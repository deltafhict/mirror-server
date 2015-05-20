import json
from websocket import create_connection

ws = create_connection('ws://127.0.0.1:1337')

while True:
	input_type	= raw_input('Type - voice|gesture? ')
	app			= raw_input('Which app? ')
	action		= raw_input('Action - open|close? ')

	ws.send(json.dumps({
			'type':		input_type,
			'action':	action,
			'app':		app
		}))

	print 'Command sent.\n\n'

ws.close()