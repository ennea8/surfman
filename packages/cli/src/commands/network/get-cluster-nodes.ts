import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createGetClusterNodesCommand(): Command {
  const command = new Command('get-cluster-nodes')
    .description('Get information about cluster nodes')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const nodes = await client.network.getClusterNodes();

        logger.success(`Found ${nodes.length} cluster node(s):`);
        nodes.forEach((node, index) => {
          logger.log(`\n${index + 1}. ${node.pubkey}`);
          if (node.gossip) logger.log(`   Gossip: ${node.gossip}`);
          if (node.tpu) logger.log(`   TPU: ${node.tpu}`);
          if (node.rpc) logger.log(`   RPC: ${node.rpc}`);
          if (node.version) logger.log(`   Version: ${node.version}`);
        });
      } catch (error) {
        logger.error(
          `Failed to get cluster nodes: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
