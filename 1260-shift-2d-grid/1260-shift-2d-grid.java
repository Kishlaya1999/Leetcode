class Solution {

    public List<List<Integer>> shiftGrid(int[][] grid, int k) {
        int m = grid.length;
        int n = grid[0].length;
        int[][] arr = new int[m][n];
        k = k % (m * n);

        if (k == 0) {
            List<List<Integer>> ans = new ArrayList();

            for (int i = 0; i < m; i++) {
                List<Integer> row = new ArrayList();
                for (int j = 0; j < n; j++) {
                    row.add(grid[i][j]);
                }
                ans.add(row);
            }
            return ans;
        }

        for (int l = 0; l < k; l++) {
            int temp = grid[m - 1][n - 1];
            for (int i = m - 1; i >= 0; i--) {
                for (int j = n - 1; j > 0; j--) {
                    grid[i][j] = grid[i][j - 1];
                }
                if (i - 1 != -1) {
                    grid[i][0] = grid[i - 1][n - 1];
                } else {
                    grid[0][0] = temp;
                }
            }
            // k = k - 1;
        }

        // List<List<Integer>> ans = new ArrayList<ArrayList<Integer>>();
        List<List<Integer>> ans = new ArrayList();

        for (int i = 0; i < m; i++) {
            List<Integer> row = new ArrayList();
            for (int j = 0; j < n; j++) {
                row.add(grid[i][j]);
            }
            ans.add(row);
        }

        return ans;
    }
}
