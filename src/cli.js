
const i = 1 // eslint-disable-line no-unused-vars
	, FileFinder = require( './file-finder.js' )
	, { Command, flags } = require( '@oclif/command' )
	;

class Zelgadis87FileFinderCommand extends Command {

	async run() {

		const { args, flags } = this.parse( Zelgadis87FileFinderCommand )

		let { filename, folder } = args;
		let { maxDepth, recursive, exact, relative } = flags;

		if (recursive)
			maxDepth = -1;
		else if (maxDepth < 0)
			return this.error( 'Max depth: Must be >= 0' );

		let results = await new FileFinder().find( folder, filename, { maxDepth, exact, relative } );
		if ( results.length === 0 )
			return this.log( "No matches found." );

		return this.log( results.join( '\n' ) );

	}

}

Zelgadis87FileFinderCommand.description = `Find files with a certain name, within a given folder tree.`

Zelgadis87FileFinderCommand.args = [
	{
		name: 'filename',
		required: true,
		hidden: false,
	},
	{
		name: 'folder',
		required: false,
		default: '.'
	}
];

Zelgadis87FileFinderCommand.flags = {
	exact: flags.boolean( { char: 'e', default: false, description: 'Use exact matching' } ),
	relative: flags.boolean( { default: false, description: 'Return relative path instead of absolute' } ),
	recursive: flags.boolean( { char: 'r', default: false, description: 'Searches recursively in subfolders', exclusive: [ 'maxDepth' ] } ),
	maxDepth: flags.integer( { char: 'n', default: 0, description: 'Max number of subfolders to traverse' } ),
	// add --version flag to show CLI version
	version: flags.version( { char: 'v', description: 'Prints version informations' } ),
	// add --help flag to show CLI version
	help: flags.help( { char: 'h', description: 'Prints help instructions' } )
}

module.exports = Zelgadis87FileFinderCommand
