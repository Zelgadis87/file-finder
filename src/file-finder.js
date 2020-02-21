
const i=1 // eslint-disable-line no-unused-vars
	, Promise = global.Promise
	, path = require( 'path' )
	, fse = require( 'fs-extra' )

class FileFinder {

	async find( folder, filename, { maxDepth = 0, exact = false, relative = false } = {} ) {

		let directory = path.join( '.', folder );
		let isMatch = exact ? isExactMatch( filename ) : isPartialMatch( filename );

		return recursiveSearch( directory, maxDepth, isMatch ).then( results => {
			if (!relative)
				return results.map( r => path.resolve( r ) );
			return results;
		});

	}

}

const isExactMatch = match => filename => filename.toLowerCase() === match.toLowerCase();
const isPartialMatch = match => filename => filename.toLowerCase().includes(match.toLowerCase());

const isFile = entry => entry.isFile();
const isDirectory = entry => entry.isDirectory();

async function recursiveSearch( folder, depth, isMatch ) {

	let contents = await fse.readdir( folder, { withFileTypes: true } );
	let matches = contents.filter( isFile ).map( entity => entity.name ).filter( isMatch ).map( filename => path.join( folder, filename ) );

	if ( depth !== 0 ) {
		let subs = Promise.all( contents.filter( isDirectory ).map( async directory => await recursiveSearch( path.join( folder, directory.name ), depth - 1, isMatch ) ) )
		matches = matches.concat( ...( await subs ) );
	}

	return matches;

}

module.exports = FileFinder;
