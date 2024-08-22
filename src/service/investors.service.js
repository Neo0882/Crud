// import { useMutation, useQuery } from 'react-query';
// import request from './HttpsRequest';

// const investorsService = {
//     getList: (params) => request.get('investors', { params }),
//     create: (data) => request.post('investors', data),
//     delete: (id) => request.delete(`investors/${id}`),
//     edit: (id, data) => request.put(`investors/${id}`, data),
//     getById: (params) => request.get('investors', { params }),
//     refillBalance: (data) => request.post('investors', data)
// };

// export const useInvestorsGetListQuery = ({ params = {}, queryParams } = {}) => {
//     return useQuery(
//         ['INVESTORS', params],
//         () => {
//             return investorsService.getList(params);
//         },
//         queryParams
//     );
// };
// export const useInvestorsgetByIdtQuery = ({ params = {}, queryParams } = {}) => {
//     return useQuery(
//         ['INVESTORS-BY-ID', params],
//         () => {
//             return investorsService.getById(params);
//         },
//         queryParams
//     );
// };

// export const useInvesotorCreateMutation = (mutationSettings) => {
//     return useMutation((data) => investorsService.create(data), mutationSettings);
// };

// export const useRefillBalanceMutation = (mutationSettings) => {
//     return useMutation((data) => investorsService.refillBalance(data), mutationSettings);
// };

// export const useInvestorsDeleteMutation = (mutationSettings) => {
//     return useMutation((id) => investorsService.delete(id), mutationSettings);
// };

// export const useInvestorsEditMutation = (mutationSettings) => {
//     return useMutation(({ id, data }) => investorsService.edit(id, data), mutationSettings);
// };

// export default investorsService;
