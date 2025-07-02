/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UpdateDocument } from 'src/_requests/reality/document';
import { ErrorResponse } from 'src/_types/site/ErrorResponse';
import {
  UpdateDocumentRequestType,
  UpdateDocumentResponseType,
} from 'src/_types/reality/document/updateDocument';

export function useUpdateDocumentMutation(
  options?: UseMutationOptions<
    UpdateDocumentResponseType,
    ErrorResponse,
    { documentId: number; data: UpdateDocumentRequestType }
  >
) {
  return useMutation<
    UpdateDocumentResponseType,
    ErrorResponse,
    { documentId: number; data: UpdateDocumentRequestType }
  >(({ documentId, data }) => UpdateDocument(documentId, data), options);
}
