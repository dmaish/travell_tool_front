import moxios from 'moxios';
import CommentsAPI from '../CommentsAPI';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

describe('CommentsAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a POST request to create a new comment', async () => {
    const commentData = {
      requestId: 'bcjkwdbjk',
      comment: 'Your comment has been created successfully',
    };

    moxios.stubRequest(`${baseUrl}/comments`, {
      status: 201,
      response: {
        comment: 'Your comment has been created successfully'
      }
    });

    const response = await CommentsAPI.createComment(commentData);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/comments`);
    expect(response.data).toEqual({
      comment: 'Your comment has been created successfully',
    });
  });

  it('should send a PUT request to update created comment', async () =>{
    const commentData = {
      requestId: 'bcjkwdbjk',
      comment: 'Your comment has been updated successfully',
    };
    const id = 'Er4HTD2xz';

    moxios.stubRequest(`${baseUrl}/comments/${id}`, {
      status: 200,
      response: {
        comment: 'Your comment has been updated successfully',
      }
    });

    const response = await CommentsAPI.editComment(commentData, id);
    
    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/comments/${id}`);
    expect(response.data).toEqual({
      comment: 'Your comment has been updated successfully',
    });
  });

  it('should send a DELETE request to delete created comment', async () =>{
    
    const commentId = 'Er4HTD2xz';

    moxios.stubRequest(`${baseUrl}/comments/${commentId}`, {
      status: 200,
      response: {
        data: 'Comment deleted successfully',
      }
    });

    const response = await CommentsAPI.deleteComment(commentId);
    
    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/comments/${commentId}`);
    expect(response.data).toEqual({
      data: 'Comment deleted successfully',
    });
  });
});
