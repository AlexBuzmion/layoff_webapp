<script>
import { fetchData } from '@/services/unityService';

export default {
  name: 'UnityLogin',
  data() {
    return {
      data: null, // or appropriate default
    };
  },
  async mounted() {
    try {
      const endpoint = 'someUnityEndpoint';
      const projectId = '201999f5-12d0-4557-b5f6-7f60846c2730';
      const environmentId = 'your_environment_id';
      this.data = await fetchData(endpoint, projectId, environmentId);
    } catch (error) {
      // Handle error or display message
    }
  },
};
</script>
