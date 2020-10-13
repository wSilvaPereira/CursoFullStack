import ev from './events.js';

ev.on('testEvent', () => {
  console.log('Ouviu também');
});

ev.emit('testEvent', 'Bla Bla Bla');
