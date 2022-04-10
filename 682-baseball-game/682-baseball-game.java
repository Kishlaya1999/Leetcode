class Solution {

    public int calPoints(String[] ops) {
        ArrayList<Integer> scores = new ArrayList<>();

        for (int i = 0; i < ops.length; i++) {
            if (ops[i].equals("+")) {
                scores.add(scores.get(scores.size()-1) + scores.get(scores.size()-2));
            } 
            else if (ops[i].equals("D")) {
                scores.add(2 * scores.get(scores.size() -1));
            } 
            else if (ops[i].equals("C")) {
                scores.remove(scores.get(scores.size()-1));
            } 
            else {
                scores.add(Integer.parseInt(ops[i]));
            }
        }

        int finalScore = 0;

        for(int i = 0; i < scores.size(); i++){
            finalScore += scores.get(i);
        }
        
        // while (int i : scores) {
        //     finalScore += i;
        //     // scores.pop();
        // }

        return finalScore;
    }
}
