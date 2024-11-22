import { HttpException, HttpStatus } from '@nestjs/common';
import hashError from './hashError';

const cryptedError = (error: any) => {
  const errorStr = String(error);

  const errorDevelopResponse: boolean =
    process.env.ERROR_DEVELOP_RESPONSE === undefined
      ? true
      : process.env.ERROR_DEVELOP_RESPONSE === 'true';

  if (errorDevelopResponse) {
    return new HttpException(errorStr, HttpStatus.INTERNAL_SERVER_ERROR);
  } else {
    return new HttpException(
      `ERROR_CODE: ${hashError(String(errorStr))}, contact administator. `,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};

export default cryptedError;
