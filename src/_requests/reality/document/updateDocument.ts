import { AxiosResponse } from 'axios';
import { reality } from 'src/_clients';
import {
  UpdateDocumentRequestType,
  UpdateDocumentResponseType,
} from 'src/_types/reality/document/updateDocument';

export default async function UpdateDocument(
  documentId: number,
  data: UpdateDocumentRequestType
): Promise<UpdateDocumentResponseType> {
  const response = await reality.put<
    UpdateDocumentRequestType,
    AxiosResponse<UpdateDocumentResponseType>
  >(`/api/v1/documents/${documentId}`, data);

  return response.data;
}
