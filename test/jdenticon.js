import * as jdenticon from 'jdenticon';
import fs from 'fs';

const png = jdenticon.toPng('z8ia3mLCYwP4JJUrbVCLkEi1VymmBR5V7HgXb');

// sharp(Buffer.from(svg)).toFile('test.png');

fs.writeFileSync('test.png', png);
