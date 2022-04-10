class Solution {

    public int calPoints(String[] ops) {
        Stack<Integer> scores = new Stack<>();

        for (int i = 0; i < ops.length; i++) {
            if (ops[i].equals("+")) {
                int previous = scores.pop();
                int previousToPrevious = scores.pop();
                scores.push(previousToPrevious);
                scores.push(previous);
                scores.push(previous + previousToPrevious);
            } 
            else if (ops[i].equals("D")) {
                scores.push(2 * scores.peek());
            } 
            else if (ops[i].equals("C")) {
                scores.pop();
            } 
            else {
                scores.push(Integer.parseInt(ops[i]));
            }
        }

        int finalScore = 0;

        while (scores.size() != 0) {
            finalScore += scores.peek();
            scores.pop();
        }

        return finalScore;
    }
}
