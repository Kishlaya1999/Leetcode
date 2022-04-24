class UndergroundSystem {

    HashMap<Integer,Pair<String,Integer>> checkInMap;  //id -> (startStation, time)
    
    //"startStation-endStation" -> (timeTaken,count)
    HashMap<String, Pair<Integer,Integer>> checkOutMap;  
    
    public UndergroundSystem() {
        checkInMap = new HashMap<>();
        checkOutMap = new HashMap<>();

    }
    
    public void checkIn(int id, String stationName, int t) {
        checkInMap.put(id,new Pair<>(stationName,t));
    }
    
    public void checkOut(int id, String stationName, int t) {
        String journey = checkInMap.get(id).getKey() + "-" + stationName;
        int timeTaken = t - checkInMap.get(id).getValue();
        
        if(!checkOutMap.containsKey(journey)){
            checkOutMap.put(journey, new Pair(timeTaken, 1));
        }
        else{
            
            timeTaken = timeTaken + checkOutMap.get(journey).getKey();
            checkOutMap.put(journey,new Pair(timeTaken, checkOutMap.get(journey).getValue() + 1 ));
        }
        
    }
    
    public double getAverageTime(String startStation, String endStation) {
        
        String journey = startStation + "-" + endStation;
        return ((double)checkOutMap.get(journey).getKey() / (double)checkOutMap.get(journey).getValue());
    }
}

/**
 * Your UndergroundSystem object will be instantiated and called as such:
 * UndergroundSystem obj = new UndergroundSystem();
 * obj.checkIn(id,stationName,t);
 * obj.checkOut(id,stationName,t);
 * double param_3 = obj.getAverageTime(startStation,endStation);
 */