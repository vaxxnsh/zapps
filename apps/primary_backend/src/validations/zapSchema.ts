import {z} from 'zod';

export const ZapCreateBody = z.object({
    typeTriggerId : z.number(),
    triggerMetaData : z.any().optional(),
    actions : z.array(z.object({
        typeActionId : z.string(),
        actionMetaData : z.any().optional()
    }))
})