import { initBlockStudioRouter } from '@blocklet/pages-kit-block-studio/init-block-studio-router';
import { initResourceRouter } from '@blocklet/pages-kit-block-studio/init-resource-router';
import { initUploaderRouter } from '@blocklet/pages-kit-block-studio/init-uploader-router';
import { Router } from 'express';

const router = Router();

router.use('/api/resources', initResourceRouter);
router.use('/api/blocks', initBlockStudioRouter);
router.use(initUploaderRouter);

export default router;
