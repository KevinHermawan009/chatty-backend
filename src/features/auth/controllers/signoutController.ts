import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';

export class SignOut {
  public async update(req: Request, res: Response): Promise<void> {
    req.session = null; //to let know cookies signout
    res.status(HTTP_STATUS.OK).json({ message: 'logout success', user: {}, token: '' });
  }
}
