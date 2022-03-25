const server = require('../index.js');
const supertest = require('supertest');
const request = supertest(server);

// USER

describe('User Routes', () => {
  it('GET /user/info should show all users', async function () {
    const response = await request
      .get('/user/info')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
  });
  it('GET /profile/:userID should send user credentials', async function () {
    const response = await request
      .get('/user/profile/40')
      .set('Accept', 'application/json');
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body.UserName).toBe('machoman');
    expect(response.status).toBe(200);
  });
  /*   it('POST /user/signup should send user credentials', async function () {
    const response = await request
      .post('/user/signup')
      .send({
        username: 'ZhangXina',
        email: 'chinesejohncena@gmail.com',
        password: 'chingbilling',
      })
      .set('Accept', 'application/json');
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body.UserName).toBe('ZhangXina');
    expect(response.status).toBe(200);
  }); */
  it('POST /user/login should send user credentials', async function () {
    const response = await request
      .post('/user/login')
      .send({
        email: 'randysavage@gmail.com',
        password: '123456',
      })
      .set('Accept', 'application/json');
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body.UserName).toBe('machoman');
    expect(response.status).toBe(201);
  });
});

// DECKS

describe('Deck Routes', () => {
  it('GET /:userID/decks should return deck details', async function () {
    const response = await request
      .get('/user/40/decks')
      .set('Accept', 'application/json');
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body[0].DeckID).toBe(190);
    expect(response.status).toBe(200);
  });
  /*     it('POST /:userID/decks should return deck details', async function () {
    const response = await request
      .post('/user/40/decks')
      .send({ deckname: 'The best deck', about: 'Wow what a great deck!' })
      .set('Accept', 'application/json');
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body[0].DeckName).toBe('The best deck');
    expect(response.status).toBe(200);
  });
  it('POST /:userID/deck/:decKID should return deck details', async function () {
    const response = await request
      .patch('/user/40/deck/190')
      .send({ deckname: 'Deck updated', about: 'This Deck has been updated' })
      .set('Accept', 'application/json');
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body.DeckName).toBe('Deck updated');
    expect(response.status).toBe(200);
  });
  it('DELETE /:userID/deck/:deckID should delete deck', async function () {
    const response = await request
      .delete('/user/40/deck/190')
      .set('Accept', 'application/json');
    expect(response.body).toBe('Deleted Deck');
    expect(response.status).toBe(200);
  }); */
});

// CARDS
describe('Cards Testing', () => {
  it('GET /:userID/deck/:deckID/cards should send cards due today', async function () {
    const response = await request
      .get('/user/20/deck/1/cards')
      .set('Accept', 'application/json');
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.status).toBe(200);
  });
  it('GET /:userID/deck/:deckID/all should send all cards', async function () {
    const response = await request
      .get('/user/20/deck/1/all')
      .set('Accept', 'application/json');
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.status).toBe(200);
  });
  /*   it('POST /:userID/deck/:deckID/cards create a card and send sucess message', async function () {
    const response = await request
      .post('/user/20/deck/84/cards')
      .send({ front: 'new card', back: 'new card' })
      .set('Accept', 'application/json');
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body).toBe('You created a Card');
    expect(response.status).toBe(200);
  });
      it('DELETE /:userID/deck/:deckID/card/:cardID/image/testing/:imageID', async function () {
    const response = await request
      .delete('/20/deck/1/card/37/image/testing/null')
      .set('Accept', 'application/json');
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body).toBe('Deleted Card');
    expect(response.status).toBe(200);
  });
  it('PATCH /:userID/deck/:deckID/card/:cardID should update card', async function () {
    const response = await request
      .patch('/user/20/deck/1/card/3')
      .send({ front: 'card edited', back: 'card edited' })
      .set('Accept', 'application/json');
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body).toBe('Updated Card');
    expect(response.status).toBe(200);
  });
  it('PATCH /:userID/deck/:deckID/card/:cardID/easy should mark card as easy', async function () {
    const response = await request
      .patch('/user/20/deck/1/card/3/easy')
      .set('Accept', 'application/json');
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body).toBe('Card marked as easy');
    expect(response.status).toBe(200);
  });
  it('PATCH /:userID/deck/:deckID/card/:cardID/hard should mark card as hard', async function () {
    const response = await request
      .patch('/user/20/deck/1/card/3/hard')
      .send({ front: 'card edited', back: 'card edited' })
      .set('Accept', 'application/json');
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body).toBe('Card marked as hard');
    expect(response.status).toBe(200);
  }); */
});

// IMAGE
describe('Image Routes', () => {
  /*   it('POST /upload should upload image ', async function () {
    const response = await request.post('/upload').attach('file', 'filepath');
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.status).toEqual(200);
  });
  it('DELETE /delete should delete image ', async function () {
    const response = await request
      .delete('/delete')
      .send({ imageID: '', deckID: '', cardID: '' })
      .set('Accept', 'application/json');
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body).toBe('Deleted Image');
    expect(response.status).toEqual(200);
  });
  it('PATCH /:userID/deck/:deckID/card/:cardID/update-image should update image details in DB', async function () {
    const response = await request
      .patch('/user/20/deck/1/card/3/update-image')
      .send({
        imageID: 'testing/timesquare_nlg6op',
        imageURL:
          'https://res.cloudinary.com/le-nuage/image/upload/e_improve,w_300,h_600,c_thumb,g_auto/v1646221856/testing/timesquare_nlg6op.jpg',
      });
    expect(response.type).toEqual(expect.stringContaining('json'));
    expect(response.body).toBe('Updated Card');
    expect(response.status).toEqual(200);
  }); */
});
