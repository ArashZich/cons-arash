import { AxiosResponse } from 'axios';
import { GetAllExpertsResponseType } from 'src/_types/reality/user/getAllExperts';
import { reality } from 'src/_clients';

export default async function GetAllExperts(): Promise<GetAllExpertsResponseType> {
  // TODO: type check the params nd the args coming
  /* eslint-disable-next-line */
  const response = await reality.get<void, AxiosResponse<GetAllExpertsResponseType>>(
    `/api/v1/users/experts`
  );

  return response.data;
}
