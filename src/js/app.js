import links from './Utility/links';
import Chaos from './Chaos';

const containerEl = document.getElementsByClassName('container')[0];
const chaos = new Chaos(containerEl, links);
chaos.init();
