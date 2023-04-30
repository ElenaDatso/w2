import BookFormData from './BookFormData';

describe('BookFormData', () => {
  it('should have the expected properties and types', () => {
    const formData: BookFormData = {
      title: 'Test Book',
      author: 'Test Author',
      dateArrived: '2022-01-01',
      type: ['Fiction'],
      isUsed: 'false',
      reading: 'true',
      cover: 'https://some.adress',
    };

    expect(formData.title).toEqual(expect.any(String));
    expect(formData.author).toEqual(expect.any(String));
    expect(formData.dateArrived).toEqual(expect.any(String));
    expect(formData.type).toEqual(expect.any(Array));
    expect(formData.isUsed).toEqual(expect.any(String));
    expect(formData.reading).toEqual(expect.any(String));
    expect(formData.cover).toEqual(expect.any(String));
  });
});
