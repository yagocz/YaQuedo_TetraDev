package com.tetradev.yaquedo.matching.service;

import com.tetradev.yaquedo.matching.dto.MatchingRequest;
import com.tetradev.yaquedo.matching.dto.MatchingResult;

public interface IMatchingService {
    MatchingResult recomendar(MatchingRequest request);
}
