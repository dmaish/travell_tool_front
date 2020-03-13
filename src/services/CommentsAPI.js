import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class CommentsAPI {
  static createComment(commentData) {
    return axios.post(`${baseUrl}/comments`, commentData);
  }

  static editComment(commentData, id) {
    return axios.put(`${baseUrl}/comments/${id}`, commentData);
  }
  
  static deleteComment(commentId) {
    return axios.delete(`${baseUrl}/comments/${commentId}`);
  }
}

export default CommentsAPI;
