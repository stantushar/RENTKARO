package com.rentkaro.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface ImageHandlingService {

	void uploadImage(String email, MultipartFile image) throws IOException;

	byte[] serveImage(Long id) throws IOException;

	List<byte[]> serveProdImage(Long prodid) throws IOException;

	void uploadProdImage(Long prodid, MultipartFile image1, MultipartFile image2) throws IOException;
}
